<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('mobile_no', 191)->nullable();
            $table->string('email', 255)->nullable()->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token', 100)->nullable();
            $table->timestamps();
            $table->string('full_name', 255)->nullable();
            $table->string('kyc_status', 50)->nullable();
            $table->string('kyc_document_type', 50)->nullable();
            $table->string('kyc_document_front', 255)->nullable();
            $table->string('kyc_document_back', 255)->nullable();
            $table->string('kyc_selfie_image', 255)->nullable();
            $table->dateTime('kyc_reviewed_at')->nullable();
            $table->string('kyc_reviewed_by', 255)->nullable();
            $table->string('referral_code', 100)->nullable();
            $table->string('referred_by', 255)->nullable();
            $table->string('role', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
