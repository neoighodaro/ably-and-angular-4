import { Component, OnInit } from '@angular/core';
declare var Ably: any;

@Component({
  selector: 	'my-app',
  templateUrl: 	'./admin.component.html',
})

export class AdminComponent implements OnInit {
	// Attributes
	orders = []
	message = ''
	ably: any
	receiveChannel: any
	respondChannel: any

	ngOnInit() {
		this.ably = new Ably.Realtime('ABLY_API_KEY')
		this.receiveChannel = this.ably.channels.get('order')
		this.respondChannel = this.ably.channels.get('reply')

		this.receiveChannel.subscribe('order', function(message: any) {
			this.orders.push(message.data)
		}.bind(this))
	}

	// Methods
	send = function() {
		this.respondChannel.publish('response', this.message)
	}
}
