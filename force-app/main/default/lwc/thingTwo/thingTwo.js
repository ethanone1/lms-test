import { LightningElement, wire } from "lwc";
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class ThingTwo extends LightningElement {
  @wire(MessageContext)
  messageContext;

  handleClick() {
    console.log(`msg> I'm Thing Two.`);
    const message = {
      recordId: "001xx000003NGSFAA4",
      message: "This is simple message from LWC",
      source: "LWC",
      recordData: { accountName: "Burlington Textiles Corp of America" },
    };
    publish(this.messageContext, SAMPLEMC, message);
  }
}
