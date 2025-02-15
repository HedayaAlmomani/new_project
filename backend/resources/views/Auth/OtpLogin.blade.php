<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login Page</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Login With Mobile</h2>

        @if(session('error'))
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
        @endif

        <form action="{{ route('otp.generate') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="exampleMobile" class="form-label">Mobile</label>
                <input type="text" class="form-control" id="exampleMobile" value="{{ old('mobile_no') }}" name="mobile_no" placeholder="Enter your mobile number">
                @error('mobile_no')
                <div class="alert alert-danger">
                    {{ $message }}
                </div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Send OTP</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
