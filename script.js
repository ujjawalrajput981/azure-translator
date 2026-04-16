function goNext() {
    const key = document.getElementById("key").value.trim();
    const region = document.getElementById("region").value.trim();

    if (key === "" || region === "") {
        alert("Please enter Subscription Key and Region.");
        return;
    }

    switchSlide("slide1", "slide2");
}

function goBack() {
    switchSlide("slide2", "slide1");
}

function switchSlide(from, to) {
    const current = document.getElementById(from);
    const next = document.getElementById(to);

    current.classList.remove("active");
    current.classList.add("hidden");

    setTimeout(() => {
        next.classList.remove("hidden");
        next.classList.add("active");
    }, 250);
}

async function translateText() {
    const key = document.getElementById("key").value.trim();
    const region = document.getElementById("region").value.trim();
    const text = document.getElementById("text").value.trim();
    const lang = document.getElementById("lang").value;
    const result = document.getElementById("result");

    if (text === "") {
        result.innerHTML = "Please enter text first.";
        return;
    }

    result.innerHTML = "Translating...";

    try {
        const response = await fetch(
            `https://${region}.api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": key,
                    "Ocp-Apim-Subscription-Region": region,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([{ Text: text }])
            }
        );

        const data = await response.json();

        if (data.error) {
            result.innerHTML = data.error.message;
            return;
        }

        result.innerHTML = data[0].translations[0].text;

    } catch (error) {
        result.innerHTML = "Translation failed. Check key, region, or internet.";
    }
}