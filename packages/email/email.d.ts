import { SendMailOptions } from 'nodemailer';
 
export namespace Email {
  /**
   * ExtraMailOptions is intentionally left empty here, but can be overridden in
   * your application if desired. This should not be necessary if you're using
   * the default mail transport, but if you're using a custom transport or have
   * configured hooks which accept additional options, you may need to define
   * this interface to match your custom options.
   */
  interface ExtraMailOptions {}
  type EmailOptions = { mailComposer: MailComposer } | (ExtraMailOptions & SendMailOptions)

  interface CustomEmailOptions extends EmailOptions {
    packageSettings?: unknown;
  }

  function send(options: EmailOptions): void;
  function sendAsync(options: EmailOptions): Promise<void>;
  function hookSend(fn: (options: EmailOptions) => boolean): void;
  function customTransport(fn: (options: CustomEmailOptions) => void): void;
}

export interface MailComposerOptions {
  escapeSMTP: boolean;
  encoding: string;
  charset: string;
  keepBcc: boolean;
  forceEmbeddedImages: boolean;
}

export declare var MailComposer: MailComposerStatic;

export interface MailComposerStatic {
  new (options: MailComposerOptions): MailComposer;
}

export interface MailComposer {
  addHeader(name: string, value: string): void;
  setMessageOption(from: string, to: string, body: string, html: string): void;
  streamMessage(): void;
  pipe(stream: any /** fs.WriteStream **/): void;
}
