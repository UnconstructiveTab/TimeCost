(() => {

	let calcButton = document.getElementById("calc-value"),
		hourlyWage = document.getElementById("wage-input"),
		costOfItem = document.getElementById("cost-input"),
		finalValue = document.getElementById("time-value");

	let cacheWage = localStorage.getItem("wage") || false;

	if(cacheWage) hourlyWage.value = cacheWage;

	let inputs = [hourlyWage, costOfItem];

	let invalid = (element) => {
		element.classList.add("invalid");
	};

	let getFact = (hours) => {
		// Maybe implement some conditional tips?
		return `That's ${Number.parseFloat(hours / 24).toFixed(1)} days straight!`;
	};

	let calulateTime = () => { // Validate inputs and calulate cost in hours
		let wage = parseFloat(hourlyWage.value) || false,
			cost = parseFloat(costOfItem.value) || false;

		if(wage && cost) {
			let hours = Number.parseFloat(cost / wage).toFixed(1);
			finalValue.classList.remove("view");
			setTimeout(() => {
				finalValue.innerHTML = `Making <strong>$${wage}</strong> an hour, it would take you <strong>${hours}</strong> hours to earn $${cost.toFixed(2)}. ${getFact(hours)}`;
				finalValue.classList.add("view");
			}, 500); // Delay to make the display of data a bit more interesting
			
		} else {
			wage == false ? invalid(hourlyWage) : "";
			cost == false ? invalid(costOfItem) : "";
		}

	};
	
	calcButton.addEventListener("click", (event) => {
		event.preventDefault();
		calulateTime();
	});

	for(let input of inputs) { // Register functions to control the inputs
		input.addEventListener("keypress", (event) => {
			let charCode = (event.which) ? event.which : event.keyCode
			if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) { // Allows 1-9 and .
				event.preventDefault();
			}
		});

		input.addEventListener("focus", (event) => {
			event.target.select();
		});

		input.addEventListener("blur", (event) => {
			let val = Number.parseFloat(event.target.value);
			val ? event.target.value = val.toFixed(2) : "";
		});

		input.addEventListener("input", (event) => {
			event.target.classList.remove("invalid");
		});
	}

	hourlyWage.addEventListener("blur", (event) => {
		// Cache the current wage into localstorage
		localStorage.setItem("wage", event.target.value);
	});

})();