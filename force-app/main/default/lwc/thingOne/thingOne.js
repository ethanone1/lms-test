import { LightningElement, wire } from "lwc";
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from "lightning/messageService";
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class ThingOne extends LightningElement {
  @wire(MessageContext)
  messageContext;

  subscription = null;
  receivedMessage;
  isDisabled = false;
  isDisabledUnsb = true;

  handleClick() {
    console.log(`msg> I'm Thing One.`);
  }

  subscribeMC() {
    console.log(`msg> Thing 1, subscribing...`);
    this.isDisabled = true;
    this.isDisabledUnsb = false;
    if (this.subscription) {
      return;
    }
    this.subscription = subscribe(
      this.messageContext,
      SAMPLEMC,
      (message) => {
        this.handleMessage(message);
      },
      { scope: APPLICATION_SCOPE }
    );
  }
  
  unsubscribeMC() {
    unsubscribe(this.subscription);
    this.subscription = null;
    this.isDisabled = false;
    this.isDisabledUnsb = true;
  }

  handleMessage(message) {
    this.receivedMessage = message ? JSON.stringify(message, null, "\t") : "no message payload";
    console.log(`msg> this.receivedMessage ${this.receivedMessage}`);
  }
}
