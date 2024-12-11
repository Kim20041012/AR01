package com.linxiangjin.arcoremeasurement.database

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import com.your.armeasurement.models.MeasurementData
import com.your.armeasurement.models.Point
import java.util.UUID

class MeasurementRepository(context: Context) {
    private val dbHelper = DatabaseHelper(context)
    
    fun saveMeasurement(measurementType: String, distance: Float, points: List<Point>) {
        val db = dbHelper.writableDatabase
        val measurementId = UUID.randomUUID().toString()
        
        db.beginTransaction()
        try {
            // Save measurement
            val measurementValues = ContentValues().apply {
                put("id", measurementId)
                put("measurement_type", measurementType)
                put("distance", distance)
                put("unit", "cm")
                put("timestamp", System.currentTimeMillis())
            }
            db.insert("measurements", null, measurementValues)

            // Save points
            points.forEach { point ->
                val pointValues = ContentValues().apply {
                    put("measurement_id", measurementId)
                    put("x", point.x)
                    put("y", point.y)
                    put("z", point.z)
                }
                db.insert("points", null, pointValues)
            }
            
            db.setTransactionSuccessful()
        } finally {
            db.endTransaction()
        }
    }

    fun getAllMeasurements(): List<MeasurementData> {
        val measurements = mutableListOf<MeasurementData>()
        val db = dbHelper.readableDatabase
        
        val cursor = db.query(
            "measurements",
            null,
            null,
            null,
            null,
            null,
            "timestamp DESC"
        )

        cursor.use { c ->
            while (c.moveToNext()) {
                val id = c.getString(c.getColumnIndexOrThrow("id"))
                val measurementType = c.getString(c.getColumnIndexOrThrow("measurement_type"))
                val distance = c.getFloat(c.getColumnIndexOrThrow("distance"))
                val unit = c.getString(c.getColumnIndexOrThrow("unit"))
                val timestamp = c.getLong(c.getColumnIndexOrThrow("timestamp"))
                
                val points = getPointsForMeasurement(db, id)
                
                measurements.add(MeasurementData(
                    id = id,
                    measurementType = measurementType,
                    distance = distance,
                    unit = unit,
                    timestamp = timestamp,
                    points = points
                ))
            }
        }
        
        return measurements
    }

    private fun getPointsForMeasurement(db: SQLiteDatabase, measurementId: String): List<Point> {
        val points = mutableListOf<Point>()
        
        val cursor = db.query(
            "points",
            null,
            "measurement_id = ?",
            arrayOf(measurementId),
            null,
            null,
            null
        )

        cursor.use { c ->
            while (c.moveToNext()) {
                points.add(Point(
                    x = c.getFloat(c.getColumnIndexOrThrow("x")),
                    y = c.getFloat(c.getColumnIndexOrThrow("y")),
                    z = c.getFloat(c.getColumnIndexOrThrow("z"))
                ))
            }
        }
        
        return points
    }
}