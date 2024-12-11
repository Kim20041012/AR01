package com.linxiangjin.arcoremeasurement.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import com.your.armeasurement.R

class MainActivity : AppCompatActivity() {
    private lateinit var startMeasurementButton: Button
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        startMeasurementButton = findViewById(R.id.start_measurement)
        startMeasurementButton.setOnClickListener {
            startActivity(Intent(this, MeasurementActivity::class.java))
        }
    }
}