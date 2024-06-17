// Define initial variables for energy and minerals
let energy = 0;
let minerals = 0;
let darkMatter = 0;
let energyGainRate = 1; // Initial energy gain rate
let mineralGainRate = 1; // Initial mineral gain rate
let darkMatterGainRate = 1; // Initial dark matter gain rate

// Object to store auto-mining intervals
let autoMining = {};

// Function to handle mining energy
document.getElementById('mineEnergy').addEventListener('click', function() {
    energy += energyGainRate;
    updateResourceDisplay('energy', energy);
    console.log('Mining energy...');
});

// Function to handle mining minerals
document.getElementById('mineMinerals').addEventListener('click', function() {
    minerals += mineralGainRate;
    updateResourceDisplay('minerals', minerals);
    console.log('Mining minerals...');
});

// Function to handle mining dark matter
document.getElementById('mineDarkMatter').addEventListener('click', function() {
    darkMatter += darkMatterGainRate;
    updateResourceDisplay('darkMatter', darkMatter);
    console.log('Mining dark matter...');
});

// Function to handle upgrading energy mine
document.getElementById('upgradeEnergy').addEventListener('mouseover', function() {
    showTooltip(this);
});

document.getElementById('upgradeEnergy').addEventListener('mouseleave', function() {
    hideTooltip();
});

document.getElementById('upgradeEnergy').addEventListener('click', function() {
    // Get current energy and upgrade cost
    let currentEnergy = energy;
    let upgradeCost = parseInt(this.getAttribute('data-cost'));

    // Check if player has enough minerals to upgrade
    if (minerals >= upgradeCost) {
        // Deduct upgrade cost from minerals
        minerals -= upgradeCost;

        // Increase energy gain rate
        energyGainRate++;

        // Update displays
        updateResourceDisplay('minerals', minerals);
        updateResourceDisplay('energy', energy);

        // Update button cost (for incremental increase)
        upgradeCost = Math.ceil(upgradeCost * 1.2); // Increase cost by 20% each upgrade
        this.setAttribute('data-cost', upgradeCost);

        // Update tooltip with new cost and description
        let tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.innerHTML = `<span class="tooltip-text">Cost: ${upgradeCost} minerals</span><br><span class="tooltip-description">${this.getAttribute('data-description')}</span>`;
        }

        console.log('Upgrading energy mine...');
    } else {
        console.log('Not enough minerals to upgrade energy mine.');
    }
});

// Function to handle upgrading mineral mine
document.getElementById('upgradeMinerals').addEventListener('mouseover', function() {
    showTooltip(this);
});

document.getElementById('upgradeMinerals').addEventListener('mouseleave', function() {
    hideTooltip();
});

document.getElementById('upgradeMinerals').addEventListener('click', function() {
    // Get current minerals and upgrade cost
    let currentMinerals = minerals;
    let upgradeCost = parseInt(this.getAttribute('data-cost'));

    // Check if player has enough minerals to upgrade
    if (minerals >= upgradeCost) {
        // Deduct upgrade cost from minerals
        minerals -= upgradeCost;

        // Increase mineral gain rate
        mineralGainRate++;

        // Update displays
        updateResourceDisplay('minerals', minerals);

        // Update button cost (for incremental increase)
        upgradeCost = Math.ceil(upgradeCost * 1.2); // Increase cost by 20% each upgrade
        this.setAttribute('data-cost', upgradeCost);

        // Update tooltip with new cost and description
        let tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.innerHTML = `<span class="tooltip-text">Cost: ${upgradeCost} minerals</span><br><span class="tooltip-description">${this.getAttribute('data-description')}</span>`;
        }

        console.log('Upgrading mineral mine...');
    } else {
        console.log('Not enough minerals to upgrade mineral mine.');
    }
});

// Function to handle auto-mining button hover
document.querySelectorAll('.auto-mine-button').forEach(function(button) {
    button.addEventListener('mouseover', function() {
        showTooltip(this);
    });

    button.addEventListener('mouseleave', function() {
        hideTooltip();
    });
});

// Function to handle auto-mining button click
document.getElementById('autoMineEnergy').addEventListener('click', function() {
    toggleAutoMine('energy');
});

document.getElementById('autoMineMinerals').addEventListener('click', function() {
    toggleAutoMine('minerals');
});

document.getElementById('autoMineDarkMatter').addEventListener('click', function() {
    toggleAutoMine('darkMatter');
});

// Function to toggle auto-mine for a resource
function toggleAutoMine(resource) {
    let autoMineButton = document.getElementById(`autoMine${resource.charAt(0).toUpperCase() + resource.slice(1)}`);
    let cost = parseInt(autoMineButton.getAttribute('data-cost'));
    let interval = parseInt(autoMineButton.getAttribute('data-interval'));

    if (!autoMining[resource]) {
        if (minerals >= cost) {
            minerals -= cost;
            updateResourceDisplay('minerals', minerals);
            autoMining[resource] = setInterval(function() {
                incrementResource(resource);
            }, interval);
            autoMineButton.textContent = `Stop Auto-Mine ${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
            console.log(`Auto-mining ${resource} started.`);
        } else {
            console.log('Not enough minerals to start auto-mining.');
        }
    } else {
        clearInterval(autoMining[resource]);
        delete autoMining[resource];
        autoMineButton.textContent = `Auto-Mine ${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
        console.log(`Auto-mining ${resource} stopped.`);
    }
}

// Function to increment a resource
function incrementResource(resource) {
    switch (resource) {
        case 'energy':
            energy += energyGainRate;
            updateResourceDisplay('energy', energy);
            break;
        case 'minerals':
            minerals += mineralGainRate;
            updateResourceDisplay('minerals', minerals);
            break;
        case 'darkMatter':
            darkMatter += darkMatterGainRate;
            updateResourceDisplay('darkMatter', darkMatter);
            break;
        default:
            break;
    }
}

// Function to update resource display
function updateResourceDisplay(resource, value) {
    document.getElementById(resource).innerText = value;
}

// Function to handle showing tooltip
function showTooltip(button) {
    let tooltip = document.querySelector('.tooltip');
    let cost = button.getAttribute('data-cost');
    let description = button.getAttribute('data-description');

    if (tooltip) {
        tooltip.innerHTML = `<span class="tooltip-text">Cost: ${cost} minerals</span><br><span class="tooltip-description">${description}</span>`;
    } else {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `<span class="tooltip-text">Cost: ${cost} minerals</span><br><span class="tooltip-description">${description}</span>`;
        document.body.appendChild(tooltip);
    }

    // Position tooltip relative to button
    let buttonRect = button.getBoundingClientRect();
    tooltip.style.left = `${buttonRect.left}px`;
    tooltip.style.top = `${buttonRect.bottom}px`;
    tooltip.style.display = 'block';
}

// Function to handle hiding tooltip
function hideTooltip() {
    let tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Function to update production rates
function updateProductionRates() {
    document.getElementById('energyProduction').textContent = energyGainRate;
    document.getElementById('mineralsProduction').textContent = mineralGainRate;
    document.getElementById('darkMatterProduction').textContent = darkMatterGainRate;
}

// Function to add achievements
function addAchievement(achievement) {
    let achievementsList = document.getElementById('achievementsList');
    let achievementItem = document.createElement('li');
    achievementItem.textContent = achievement;
    achievementsList.appendChild(achievementItem);
    console.log(`Achievement unlocked: ${achievement}`);
}

// Example of unlocking an achievement (call this when a condition is met)
// addAchievement('Reached 1000 Energy');

// Function to handle game reset
document.getElementById('resetGame').addEventListener('click', function() {
    energy = 0;
    minerals = 0;
    darkMatter = 0;
    energyGainRate = 1;
    mineralGainRate = 1;
    darkMatterGainRate = 1;

    // Reset upgrade costs
    document.getElementById('upgradeEnergy').setAttribute('data-cost', 10);
    document.getElementById('upgradeMinerals').setAttribute('data-cost', 20);

    // Reset resource displays
    updateResourceDisplay('energy', energy);
    updateResourceDisplay('minerals', minerals);
    updateResourceDisplay('darkMatter', darkMatter);

    // Reset tooltip for upgrades
    hideTooltip();

    // Stop auto-mining if active
    Object.keys(autoMining).forEach(function(resource) {
        clearInterval(autoMining[resource]);
    });
    autoMining = {};

    console.log('Game reset.');
});

// Function to simulate game loop (update production rates)
setInterval(function() {
    updateProductionRates();
}, 1000); // Update every second