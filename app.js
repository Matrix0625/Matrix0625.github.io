function loadQuestion1() {
    document.getElementById('mainContainer').style.display = 'block';
    document.getElementById('questionForm').style.display = 'block';
    document.querySelector('.hero-content').style.display = 'none';
}

function showNextQuestion(nextQuestionId) {
    const currentQuestion = document.querySelector('#questionForm > div:not([style*="display: none"])');
    if (currentQuestion) {
        currentQuestion.style.display = 'none';
    }
    document.getElementById(nextQuestionId).style.display = 'block';
}

function submitForm() {
    const formData = new FormData(document.getElementById('questionForm'));
    const data = {
        plantTypes: formData.getAll('plantType'),
        colors: formData.getAll('color'),
        scents: formData.getAll('scent'),
        effects: formData.getAll('effect'),
        usages: formData.getAll('usage')
    };
    
    document.getElementById('questionForm').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(() => {
        const recommendedOil = calculateRecommendations(data);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('recommendation').innerHTML = `Recommended essential oil: ${recommendedOil.oil} (Usage: ${recommendedOil.usage.join(', ')})`;
        const prompt = generateDeepAIPrompt(recommendedOil);
        generateImage(prompt).then(imageUrl => {
            if (imageUrl) {
                displayImage(imageUrl);
            } else {
                console.error('Failed to generate image.');
            }
        }).catch(error => {
            console.error('Error generating image:', error);
        });
    }, 5000);
}

function calculateRecommendations(data) {
    const recommendationMaps = {
        plantTypes: {
            "Flower": ["Lavender oil", "Rose oil", "Geranium oil"],
            "Herb": ["Peppermint oil", "Basil oil"],
            "Tree": ["Sandalwood oil", "Cedarwood oil"],
            "Fruit": ["Lemon oil", "Orange oil"]
        },
        scents: {
            "Floral": ["Rose oil", "Geranium oil"],
            "Fruity": ["Lemon oil", "Orange oil"],
            "Herbal": ["Peppermint oil", "Tea Tree oil"],
            "Woody": ["Sandalwood oil", "Cedarwood oil"],
            "Spicy": ["Ginger oil"]
        },
        colors: {
            "Red": ["Frankincense oil", "Rose oil"],
            "Orange": ["Wild Orange oil"],
            "Yellow": ["Lemon oil", "Ginger oil"],
            "Green": ["Tea Tree oil", "Peppermint oil"],
            "Blue": ["Peppermint oil"],
            "Purple": ["Lavender oil"],
            "Pink": ["Rose oil", "Geranium oil"],
            "Wood": ["Sandalwood oil", "Cedarwood oil"]
        },
        effects: {
            "Relaxation/Stress Relief": ["Lavender oil", "Wild Orange oil"],
            "Energy/Focus": ["Peppermint oil", "Lemon oil"],
            "Sleep Improvement": ["Lavender oil", "Sandalwood oil"],
            "Pain Relief": ["Frankincense oil", "Tea Tree oil"],
            "Skin Care": ["Rose oil", "Geranium oil", "Cedarwood oil"],
            "Immune Support": ["Frankincense oil"]
        }
    };

    const usageRecommendations = {
        "Lavender oil": ["Diffusion", "Internal", "Topical"],
        "Rose oil": ["Diffusion", "Topical"],
        "Geranium oil": ["Diffusion", "Topical"],
        "Peppermint oil": ["Diffusion", "Internal", "Topical"],
        "Basil oil": ["Diffusion", "Internal", "Topical"],
        "Sandalwood oil": ["Diffusion", "Internal", "Topical"],
        "Cedarwood oil": ["Diffusion", "Topical"],
        "Lemon oil": ["Diffusion", "Internal", "Topical"],
        "Orange oil": ["Diffusion", "Internal", "Topical"],
        "Tea Tree oil": ["Diffusion", "Topical"],
        "Ginger oil": ["Diffusion", "Internal", "Topical"],
        "Frankincense oil": ["Diffusion", "Internal", "Topical"],
        "Wild Orange oil": ["Diffusion", "Internal", "Topical"]
    };

    let oilRecommendations = new Map();

    // General function to handle recommendations
    function addRecommendations(map, key) {
        if (map[key]) {
            map[key].forEach(oil => {
                oilRecommendations.set(oil, (oilRecommendations.get(oil) || 0) + 1);
            });
        }
    }

    // Recommend oils based on plant types, scents, colors, and effects
    data.plantTypes.forEach(type => addRecommendations(recommendationMaps.plantTypes, type));
    data.scents.forEach(scent => addRecommendations(recommendationMaps.scents, scent));
    data.colors.forEach(color => addRecommendations(recommendationMaps.colors, color));
    data.effects.forEach(effect => addRecommendations(recommendationMaps.effects, effect));

    // Sort recommendations by weight and return the top one
    const topOil = Array.from(oilRecommendations.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 1)
        .map(entry => entry[0])[0];

    return {
        oil: topOil,
        usage: usageRecommendations[topOil]
    };
}

function generateDeepAIPrompt(oil) {
    return `A visually appealing image featuring a single essential oil bottle surrounded by the plants from which the oil is derived: ${oil.oil}. Highlight the plants clearly and beautifully in a natural and calming setting.`;
}

async function generateImage(prompt) {
    const response = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
            'Api-Key': 'bd0f2253-06c2-4069-8c8f-4bada6eee8f5', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: prompt })
    });

    if (response.ok) {
        const data = await response.json();
        return data.output_url;
    } else {
        console.error('Error generating image:', response.statusText);
        return null;
    }
}

function displayImage(imageUrl) {
    const imageResultDiv = document.getElementById('imageResult');
    imageResultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
}

function displayRecommendation(recommendation, imageUrl) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p id="recommendation">Recommended essential oil: ${recommendation.oil} (Usage: ${recommendation.usage.join(', ')})</p><a href="${imageUrl}" target="_blank">Click here to view the generated image</a>`;
}
