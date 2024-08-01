(function () {
	'use strict';

	var tinyslider = function () {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	function showContent(contentNumber) {
		const contents = document.querySelectorAll('.content');
		contents.forEach((content, index) => {
			if (index === contentNumber - 1) {
				content.style.display = 'block';
			} else {
				content.style.display = 'none';
			}
		});
	}


	var sitePlusMinus = function () {

		var value,
			quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
			var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
			var increase = quantityContainer.getElementsByClassName('increase')[0];
			var decrease = quantityContainer.getElementsByClassName('decrease')[0];
			increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
			decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
		}

		function init() {
			for (var i = 0; i < quantity.length; i++) {
				createBindings(quantity[i]);
			}
		};

		function increaseValue(event, quantityAmount) {
			value = parseInt(quantityAmount.value, 10);

			console.log(quantityAmount, quantityAmount.value);

			value = isNaN(value) ? 0 : value;
			value++;
			quantityAmount.value = value;
		}

		function decreaseValue(event, quantityAmount) {
			value = parseInt(quantityAmount.value, 10);

			value = isNaN(value) ? 0 : value;
			if (value > 0) value--;

			quantityAmount.value = value;
		}

		init();

	};
	sitePlusMinus();


})()


// modal class
// document.addEventListener('DOMContentLoaded', (event) => {
//     var modal = document.getElementById("myModal");
//     var span = document.getElementsByClassName("close")[0];

//     // Show the modal when the page loads
//     modal.style.display = "block";

//     // Close the modal when the user clicks on the close button
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // Close the modal when the user clicks outside of the modal
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// });


document.addEventListener('DOMContentLoaded', (event) => {
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];

	// Show the modal when the page loads
	modal.style.display = "flex";
	document.body.classList.add("modal-open");

	// Close the modal when the user clicks on the close button
	span.onclick = function () {
		modal.style.display = "none";
		document.body.classList.remove("modal-open");
	}

	// Close the modal when the user clicks outside of the modal
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
			document.body.classList.remove("modal-open");
		}
	}
});


//add items to cart
// document.addEventListener('DOMContentLoaded', function () {
// 	var deleteButtons = document.querySelectorAll('.delete-btn');

// 	deleteButtons.forEach(function (button) {
// 		button.addEventListener('click', function (event) {
// 			event.preventDefault(); // Prevent default anchor behavior
// 			var row = this.closest('tr'); // Find the closest <tr> element
// 			row.parentNode.removeChild(row); // Remove the row from the DOM
// 		});
// 	});
// });


//add items to cart
document.addEventListener('DOMContentLoaded', function () {
	var productItems = document.querySelectorAll('.product-item');

	productItems.forEach(function (item) {
		var titleElement = item.querySelector('.product-title');
		var priceElement = item.querySelector('.product-price');
		var imageElement = item.querySelector('.product-thumbnail');
		var crossIcon = item.querySelector('.icon-cross');

		console.log(titleElement, priceElement, imageElement, crossIcon); // Debugging line

		// Update the data attributes based on the current content
		crossIcon.setAttribute('data-title', titleElement.textContent.trim());
		crossIcon.setAttribute('data-price', priceElement.textContent.trim());
		crossIcon.setAttribute('data-image', imageElement.getAttribute('src'));

		crossIcon.addEventListener('click', function (event) {
			event.preventDefault();

			// Get item details
			var itemTitle = this.getAttribute('data-title');
			var itemPrice = this.getAttribute('data-price');
			var itemImage = this.getAttribute('data-image');

			// Create an item object
			var item = {
				title: itemTitle,
				price: itemPrice,
				image: itemImage,
				quantity: 1
			};

			// Get existing cart items from local storage
			var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

			// Check if item already exists in the cart
			var existingItem = cartItems.find(cartItem => cartItem.title === item.title);
			if (existingItem) {
				existingItem.quantity += 1; // Increment quantity if item exists
			} else {
				cartItems.push(item); // Add new item if it doesn't exist
			}

			// Save the updated cart items to local storage
			localStorage.setItem('cartItems', JSON.stringify(cartItems));

			  alert('Item added to cart!');
		});
	});
});


	// JavaScript for Cart Page update cart page logic
	document.addEventListener('DOMContentLoaded', function () {
		var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		
		var cartTableBody = document.querySelector('#cart-table-body');

		function updateCartTotals() {
			let subtotal = 0;
			document.querySelectorAll('tbody tr').forEach(row => {
				const total = parseFloat(row.querySelector('td:nth-child(5)').textContent.replace('RM', ''));
				subtotal += total;
			});
			document.getElementById('Subtotal').textContent = `RM${subtotal.toFixed(2)}`;
			document.getElementById('Total').textContent = `RM${subtotal.toFixed(2)}`;
		}

		cartItems.forEach(function (item) {
			var row = document.createElement('tr');

			row.innerHTML = `
            <td class="product-thumbnail">
                <img src="${item.image}" alt="Image" class="img-fluid">
            </td>
            <td class="product-name" id='cart-items'>
                <h2 class="h5 text-black">${item.title}</h2>
            </td>
            <td class="product-price">${item.price}</td>
            <td>
                <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 160px;">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                    </div>
                    <input type="text" class="form-control text-center quantity-amount" value="${item.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-black increase" type="button">&plus;</button>
                    </div>
                </div>
            </td>
            <td class="product-total">${(parseFloat(item.price.replace('RM', '')) * item.quantity).toFixed(2)}</td>
            <td><a href="#" class="btn btn-black btn-sm delete-btn">X</a></td>
        `;
			
			cartTableBody.appendChild(row);
		});

		// Add event listeners for increase, decrease, and delete buttons
		// cartTableBody.addEventListener('click', function (event) {
		// 	if (event.target.classList.contains('increase') || event.target.classList.contains('decrease')) {
		// 		var quantityInput = event.target.closest('.quantity-container').querySelector('.quantity-amount');
		// 		var newQuantity = parseInt(quantityInput.value);
		// 		if (event.target.classList.contains('increase')) {
		// 			newQuantity += 1;
		// 		} else if (event.target.classList.contains('decrease') && newQuantity > 1) {
		// 			newQuantity -= 1;
		// 		}
		// 		quantityInput.value = newQuantity;

		// 		// Update the total price for the item
		// 		var priceElement = event.target.closest('tr').querySelector('td:nth-child(3)');
		// 		var totalPriceElement = event.target.closest('tr').querySelector('td:nth-child(5)');
		// 		var price = parseFloat(priceElement.textContent.replace('RM', ''));
		// 		totalPriceElement.textContent = (price * newQuantity).toFixed(2);

		// 		// Update the cart items in local storage
		// 		var itemTitle = event.target.closest('tr').querySelector('.product-name h2').textContent;
		// 		var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		// 		var cartItem = cartItems.find(cartItem => cartItem.title === itemTitle);
		// 		if (cartItem) {
		// 			cartItem.quantity = newQuantity;
		// 			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		// 		}

		// 		updateCartTotals();
		// 	} else if (event.target.classList.contains('delete-btn')) {
		// 		event.preventDefault();
		// 		var row = event.target.closest('tr');
		// 		var itemTitle = row.querySelector('.product-name h2').textContent;
		// 		row.remove();

		// 		// Remove the item from local storage
		// 		var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		// 		cartItems = cartItems.filter(cartItem => cartItem.title !== itemTitle);
		// 		localStorage.setItem('cartItems', JSON.stringify(cartItems));

		// 		// Update cart totals
		// 		updateCartTotals();
		// 	}
		// });

		// Initial calculation of cart totals
		updateCartTotals();
	});


	document.addEventListener('DOMContentLoaded', function () {
		// Update total for each product and local storage
		function updateProductTotal(row) {
			const price = parseFloat(row.querySelector('.product-price').textContent.replace('RM', ''));
			const quantity = parseInt(row.querySelector('.quantity-amount').value);
			const total = price * quantity;
			row.querySelector('.product-total').textContent = `RM${total.toFixed(2)}`;
	
			// Update local storage
			const title = row.querySelector('.product-name h2').textContent;
			let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
			const cartItem = cartItems.find(item => item.title === title);
			if (cartItem) {
				cartItem.quantity = quantity;
				localStorage.setItem('cartItems', JSON.stringify(cartItems));
			}
	
			updateCartTotals();
		}
	
		// Update cart totals
		function updateCartTotals() {
			let subtotal = 0;
			document.querySelectorAll('tbody tr').forEach(row => {
				const total = parseFloat(row.querySelector('.product-total').textContent.replace('RM', ''));
				subtotal += total;
			});
			document.getElementById('Subtotal').textContent = `RM${subtotal.toFixed(2)}`;
			document.getElementById('Total').textContent = `RM${subtotal.toFixed(2)}`;
			console.log('Subtotal:', subtotal); // Debugging line
		}
	
		// Event listeners for quantity change
		document.querySelectorAll('.quantity-amount').forEach(input => {
			input.addEventListener('change', function () {
				const row = this.closest('tr');
				updateProductTotal(row);
			});
		});
	
		// Event listeners for increase/decrease buttons
		document.querySelectorAll('.increase').forEach(button => {
			button.addEventListener('click', function () {
				const input = this.closest('.quantity-container').querySelector('.quantity-amount');
				input.value = parseInt(input.value) + 1;
				const row = this.closest('tr');
				updateProductTotal(row);
			});
		});
	
		document.querySelectorAll('.decrease').forEach(button => {
			button.addEventListener('click', function () {
				const input = this.closest('.quantity-container').querySelector('.quantity-amount');
				if (parseInt(input.value) > 1) {
					input.value = parseInt(input.value) - 1;
					const row = this.closest('tr');
					updateProductTotal(row);
				}
			});
		});
	
		document.querySelectorAll('.delete-btn').forEach(button => {
			button.addEventListener('click', function (event) {
				event.preventDefault(); // Prevent the default action of the anchor tag
				const row = this.closest('tr');
				const title = row.querySelector('.product-name h2').textContent;
				row.remove(); // Remove the product row from the table
	
				// Remove from local storage
				let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
				cartItems = cartItems.filter(item => item.title !== title);
				localStorage.setItem('cartItems', JSON.stringify(cartItems));
	
				updateCartTotals(); // Update the cart totals after removing the product
			});
		});
	
		// Initial calculation and setting up event listeners
		document.querySelectorAll('tbody tr').forEach(row => {
			updateProductTotal(row);
		});
	});
	