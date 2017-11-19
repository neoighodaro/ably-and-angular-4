import { Component, OnInit } from '@angular/core';
declare var Ably: any;

@Component({
  selector: 	'my-app',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
	// Attributes
	name = ''
	reply = ''
	newVal = ''
	orderItems = []
	orderSummary = []

	// Ably attributes
	ably : any
	sendChannel : any
	receiveChannel : any

	ngOnInit() {
		this.ably = new Ably.Realtime('ABLY_API_KEY')

		this.sendChannel = this.ably.channels.get('order')
		this.receiveChannel = this.ably.channels.get('reply')

		// Ably Subscription
		this.receiveChannel.subscribe('response', function(message:any) {
			this.reply = message.data
		}.bind(this));
	}

	// Methods
	add = function(){
		this.orderItems.push(this.newVal)
		this.newVal = ""
	}

	order = function() {
		if (this.name !== "") {
			this.sendChannel.publish('order', {
				name : this.name,
				order : this.orderItems
			});

			this.orderItems = []
			this.orderSummary = this.orderItems
			this.reply = "Waiting for a response..."
		}
		else {
			document.getElementById('name').focus()
			document.getElementById('name-error').innerText = "Please give your name to complete your orders"
		}
	}
}
