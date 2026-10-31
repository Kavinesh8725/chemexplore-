
const compounds = [
    {
        name: "Water",
        formula: "H₂O",
        mass: "18.015 g/mol",
        cas: "7732-18-5",
        type: "Inorganic compound",
        appearance: "Colorless liquid",
        elements: "Hydrogen and Oxygen",
        uses: "Drinking, cooking, cleaning and biological processes."
    },
    {
        name: "Sodium Chloride",
        formula: "NaCl",
        mass: "58.44 g/mol",
        cas: "7647-14-5",
        type: "Ionic compound",
        appearance: "White crystalline solid",
        elements: "Sodium and Chlorine",
        uses: "Food seasoning and food preservation."
    },
    {
        name: "Glucose",
        formula: "C₆H₁₂O₆",
        mass: "180.16 g/mol",
        cas: "50-99-7",
        type: "Carbohydrate",
        appearance: "White crystalline solid",
        elements: "Carbon, Hydrogen and Oxygen",
        uses: "An important source of energy in living organisms."
    },
    {
        name: "Carbon Dioxide",
        formula: "CO₂",
        mass: "44.01 g/mol",
        cas: "124-38-9",
        type: "Inorganic compound",
        appearance: "Colorless gas",
        elements: "Carbon and Oxygen",
        uses: "Carbonated drinks and plant photosynthesis."
    },
    {
        name: "Sodium Bicarbonate (Baking Soda)",
        formula: "NaHCO₃",
        mass: "84.01 g/mol",
        cas: "144-55-8",
        type: "Ionic compound",
        appearance: "White powder",
        elements: "Sodium, Hydrogen, Carbon and Oxygen",
        uses: "Baking and household cleaning."
    },
    {
        name: "Methane",
        formula: "CH₄",
        mass: "16.04 g/mol",
        cas: "74-82-8",
        type: "Organic compound",
        appearance: "Colorless gas",
        elements: "Carbon and Hydrogen",
        uses: "A major component of natural gas used as fuel."
    }
];

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

function normalize(value) {
    return value
        .toLowerCase()
        .replace(/[₀-₉]/g, digit =>
            String("₀₁₂₃₄₅₆₇₈₉".indexOf(digit))
        )
        .replace(/\s+/g, " ")
        .trim();
}

function searchCompound() {
    const query = normalize(searchInput.value);

    if (!query) {
        result.innerHTML =
            "<h3>Enter a compound</h3>" +
            "<p>Type a chemical name, formula or CAS number.</p>";
        return;
    }

    const found = compounds.find(compound => {
        return (
            normalize(compound.name).includes(query) ||
            normalize(compound.formula) === query ||
            compound.cas === query
        );
    });

    if (!found) {
        result.innerHTML =
            "<h3>Compound not found</h3>" +
            "<p>This starter version contains six compounds. " +
            "Try water, NaCl, glucose, CO2, baking soda or methane.</p>";
        return;
    }

    result.innerHTML = `
        <div class="molecule-icon">⚛️</div>
        <h3>${found.name}</h3>
        <p><strong>Formula:</strong> ${found.formula}</p>
        <p><strong>Molar mass:</strong> ${found.mass}</p>
        <p><strong>CAS number:</strong> ${found.cas}</p>
        <p><strong>Type:</strong> ${found.type}</p>
        <p><strong>Appearance:</strong> ${found.appearance}</p>
        <p><strong>Elements:</strong> ${found.elements}</p>
        <p><strong>Uses:</strong> ${found.uses}</p>
    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

searchButton.addEventListener("click", searchCompound);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchCompound();
    }
});

document.querySelectorAll(".compound-card").forEach(card => {
    card.addEventListener("click", () => {
        searchInput.value = card.dataset.search;
        searchCompound();
    });
});