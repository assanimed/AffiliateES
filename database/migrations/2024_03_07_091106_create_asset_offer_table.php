<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assets_offer', function (Blueprint $table) {
            $table->id();
        $table->unsignedBigInteger('assets_id');
        $table->unsignedBigInteger('offer_id');

        $table->foreign('assets_id')->references('id')->on('assets')->onDelete('cascade');
        $table->foreign('offer_id')->references('id')->on('offers')->onDelete('cascade');

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_offer');
    }
};