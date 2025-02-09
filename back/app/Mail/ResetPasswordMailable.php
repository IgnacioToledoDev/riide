<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMailable extends Mailable
{
    use Queueable, SerializesModels;

    public string $token;
    public string $email;

    /**
     * Create a new message instance.
     */
    public function __construct(string $token, string $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Solicitud recuperación de contraseña',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $appURL = getenv('APP_FRONT_URL');
        return new Content(
            view: 'emails.resetPasswordEmail',
            with: [
                'token' => $this->token,
                'email' => $this->email,
                'host' => 'http://' . $appURL
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
