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
        Schema::create('penimbangan', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_bayi')->unsigned()->nullable();
            $table->foreign('id_bayi')->references('id')->on('bayi')->onDelete('cascade')->onUpdate('cascade');
            $table->bigInteger('id_standar_deviasi')->unsigned()->nullable();
            $table->foreign('id_standar_deviasi')->references('id')->on('standar_deviasi')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tahun_penimbangan')->unsigned();
            $table->integer('bulan_penimbangan')->unsigned();
            $table->float('berat_badan')->nullable()->unsigned();
            $table->float('tinggi_badan')->nullable()->unsigned();
            $table->float('lila')->nullable()->unsigned();
            $table->float('lingkar_kepala')->nullable()->unsigned();
            $table->string('cara_ukur')->nullable();
            $table->string('ntob')->nullable();
            $table->string('asi_eksklusif')->nullable();
            $table->boolean('vit_a')->nullable();
            $table->boolean('double_t')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penimbangan');
    }
};
