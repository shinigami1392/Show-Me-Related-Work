<template>
	
	<div id="page-content">
		<div id="map"></div>
		
		<div id="contact-us">
		
			<h1>Contact Us</h1>
			<div class="envelop-icon"><i class="far fa-envelope fa-2x"></i></div>
			<h2>Don't hesitate to contact us</h2>
			
			<div id="contact-info">
				<b>Show Me Related Work</b>
				<p>Phone: +1 (0) 000 0000 001 </p>
				<p>Email: customer_support@showme.com</p>
			</div>
			
			<br/>
			
			<form action="https://formspree.io/rajatsjc@gmail.com" method="POST">
			  <input name="email" type="email" placeholder="Your email">
			  <br/>
			  <textarea name="message"  placeholder="Your message"></textarea>
			  <br/>
			  <button class="submit-button" type="submit">Send Message</button>
			</form>
		
		</div>
	</div>
</template>


<script>
export default {
  
}
</script>
    body {
			font-family: Arial;
		}
	
       #map {
        height: 400px;
        width: 50%;
		float:left;
		margin-top: 30px;
       }
	   
		#page-content {
			padding-top: 60px;
			width: 60%;
			margin: 0 auto;
		}
		
		#contact-us {
			padding-left: 40px;
			float:left;
		}
		
		#contact-info {
			padding: 0;
			margin: 0;
		}
		
		#contact-info p { 
			margin:0;
			color: #787878;
		}
		
		input[type=email], select {
			width: 250px;
			padding: 12px 20px;
			margin: 8px 0;
			display: inline-block;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-sizing: border-box;
		}
		
		textarea {
			width: 400px;
			padding: 12px 20px;
			margin: 8px 0;
			display: inline-block;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-sizing: border-box;
			max-width:400px;
			max-height:200px;
			min-width: 400px;
			min-height: 100px;
		}
		
		.submit-button {
			background-color: white; 
			color: black; 
			border: 2px solid #008CBA;
			border-radius: 20px;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-left: 30px;
			padding-right: 30px;
		}
		
		.submit-button:hover {
			background-color: #008CBA;
			color: white;
		}
		
		#contact-us h1 {
			font-size: 39px;
			font-style: normal;
			font-variant: normal;
			font-weight: 200;
			line-height: 26.4px;
		}
		
		#contact-us h2 {
			font-size: 20px;
			font-style: normal;
			font-variant: normal;
			font-weight: 550;
			line-height: 26.4px;
		}
		
		.envelop-icon {
			float:left;
			padding-right:5px;
		}
		
<style>

</style>
