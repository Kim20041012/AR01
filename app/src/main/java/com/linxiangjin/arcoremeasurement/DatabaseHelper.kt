package com.linxiangjin.arcoremeasurement.database

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class DatabaseHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
    companion object {
        private const val DATABASE_NAME = "ARMeasurements.db"
        private const val DATABASE_VERSION = 1
        
        private const val CREATE_MEASUREMENTS_TABLE = """
            CREATE TABLE measurements (
                id TEXT PRIMARY KEY,
                measurement_type TEXT NOT NULL,
                distance REAL NOT NULL,
                unit TEXT NOT NULL,
                timestamp INTEGER NOT NULL
            )
        """
        
        private const val CREATE_POINTS_TABLE = """
            CREATE TABLE points (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                measurement_id TEXT NOT NULL,
                x REAL NOT NULL,
                y REAL NOT NULL,
                z REAL NOT NULL,
                FOREIGN KEY(measurement_id) REFERENCES measurements(id)
            )
        """
    }
    
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(CREATE_MEASUREMENTS_TABLE)
        db.execSQL(CREATE_POINTS_TABLE)
    }
    
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS points")
        db.execSQL("DROP TABLE IF EXISTS measurements")
        onCreate(db)
    }
}