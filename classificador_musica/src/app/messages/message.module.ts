import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageComponent } from "./message.component";
import { MessageService } from "./ message.service";
import { MEssageErrorHandler } from "./errorHandling";

@NgModule({
    imports: [BrowserModule],
    declarations: [MessageComponent],
    exports: [MessageComponent],
    providers: [
        MessageService,
        {provide: ErrorHandler, useClass: MEssageErrorHandler}
    ]
})
export class MessageModule { }