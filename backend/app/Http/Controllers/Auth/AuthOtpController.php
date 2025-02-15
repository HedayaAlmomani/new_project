<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserOtp;

class AuthOtpController extends Controller
{
    public function login(){
        return view('Auth.OtpLogin');
    }

    public function generate(Request $request){
        $request->validate([
            'mobile_no' => 'required|exists:users,mobile_no'
        ]);

        $userOtp = $this->generateOTP($request->mobile_no);
        $userOtp->sendSMS($request->mobile_no);

        return redirect()->route('otp.verification',[$userOtp->user_id])->with('success','OTP has been Sent On Your Mobile Number.');
    }

    public function generateOTP($mobile_no){
        $user = User::where('mobile_no',$mobile_no)->first();
        $userOtp = UserOtp::where('user_id',$user->id)->latest()->first();

        $now = now();

        if ($userOtp && $now->isBefore($userOtp->expire_at)) {
            return $userOtp;
        }

        return UserOtp::Create([
            'user_id' => $user->id,
            'otp' => rand(123456, 999999),
            'expire_at' => $now->addMinutes(10)
        ]);
    }

    public function verification($user_id){
        return view('Auth.OtpVerification')->with([
            'user_id' => $user_id
        ]);
    }

    public function loginWithOtp(Request $request){
        $request->validate([
            'otp' => 'required',
            'user_id' =>'required|exists:users,id',
        ]);

        $userOtp = UserOtp::where('user_id',$request->user_id)->where('otp',$request->otp)->first();

        $now = now();
        if(!$userOtp){
            return redirect()->back()->with('error','Please Enter Valid Otp.');
        }elseif($userOtp && $now->isAfter($userOtp->expire_at)){
            return redirect()->back()->with('error','Your OTP Has been Expired');
        }

        $user = User::whereId($request->user_id)->first();

        if ($user) {
            $userOtp->update([
                'expire_at' => now()
            ]);

            Auth::login($user);
            return redirect('/home');
        }

        return redirect()->route('otp.login')->with('error','Your Is Not Correct');
    }
}
