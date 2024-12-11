package com.linxiangjin.arcoremeasurement.models

data class MeasurementData(
    val id: String = "",
    val measurementType: String = "",
    val distance: Float = 0f,
    val unit: String = "cm",
    val timestamp: Long = System.currentTimeMillis(),
    val points: List<Point> = emptyList()
)