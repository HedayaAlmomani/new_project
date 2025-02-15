<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OTP Verification</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Verify OTP</h2>

        @if(session('error'))
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
        @endif

        @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
        @endif

        <form action="{{ route('otp.getlogin') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="exampleOtp" class="form-label">OTP</label>
                <input type="hidden" name="user_id" value="{{ $user_id }}">
                <input type="text" class="form-control" id="exampleOtp" value="{{ old('otp') }}" name="otp" placeholder="Enter your mobile number">
                @error('otp')
                <div class="alert alert-danger">
                    {{ $message }}
                </div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Verify OTP & Login</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
