<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Exception;
use Twilio\Rest\Client;
use GuzzleHttp\Client as GuzzleClient;
use Twilio\Http\GuzzleClient as TwilioGuzzleClient;

class UserOtp extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'otp',
        'expire_at'
    ];

    public function sendSMS($receiverNumber)
    {
        $message = 'Login OTP is:-' . $this->otp;

        try {
            $TwilioSid = env('TWILIO_SID');
            $TwilioToken = env('TWILIO_AUTH_TOKEN');
            $TwilioNumber = env('TWILIO_NUMBER');

            // Create a custom Guzzle client with SSL verification disabled
            $guzzleClient = new GuzzleClient([
                'verify' => false,  // Disable SSL verification
            ]);

            // Wrap the Guzzle client in Twilio's GuzzleClient
            $twilioHttpClient = new TwilioGuzzleClient($guzzleClient);

            // Pass the TwilioGuzzleClient to the Twilio Client
            $Client = new Client($TwilioSid, $TwilioToken, null, null, $twilioHttpClient);

            $Client->messages->create('+91' . $receiverNumber, [
                'from' => $TwilioNumber,
                'body' => $message
            ]);

            return response()->json(['message' => 'Otp sent successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
