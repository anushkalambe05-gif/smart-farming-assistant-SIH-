package com.example.smsgateway

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.telephony.SmsManager
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : ComponentActivity() {

    companion object {
        private const val SERVER_IP = "10.147.4.98"
        private const val SERVER_PORT = 8080
    }

    private val smsPermissionLauncher =
        registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { granted ->
            Toast.makeText(
                this,
                if (granted) "SMS permission granted"
                else "SMS permission denied",
                Toast.LENGTH_SHORT
            ).show()
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (
            checkSelfPermission(Manifest.permission.SEND_SMS)
            != PackageManager.PERMISSION_GRANTED
        ) {
            smsPermissionLauncher.launch(Manifest.permission.SEND_SMS)
        }

        setContent {
            SMSGatewayScreen(
                onSendSMS = { phoneNumbers, message ->
                    sendSMS(phoneNumbers, message)
                }
            )
        }
    }

    private fun sendSMS(
        phoneNumbers: List<String>,
        message: String
    ) {
        if (
            checkSelfPermission(Manifest.permission.SEND_SMS)
            != PackageManager.PERMISSION_GRANTED
        ) {
            Toast.makeText(
                this,
                "SMS permission not granted",
                Toast.LENGTH_SHORT
            ).show()
            return
        }

        try {
            val smsManager = getSystemService(SmsManager::class.java)
            var successCount = 0

            for (phoneNumber in phoneNumbers) {
                smsManager.sendTextMessage(
                    phoneNumber,
                    null,
                    message,
                    null,
                    null
                )
                successCount++
            }

            Toast.makeText(
                this,
                "SMS sent to $successCount number(s)",
                Toast.LENGTH_LONG
            ).show()

        } catch (e: Exception) {
            Toast.makeText(
                this,
                "SMS failed: ${e.message}",
                Toast.LENGTH_LONG
            ).show()
        }
    }
}

@Composable
fun SMSGatewayScreen(
    onSendSMS: (List<String>, String) -> Unit
) {
    var phoneNumber by remember {
        mutableStateOf("")
    }

    var message by remember {
        mutableStateOf("")
    }

    var serverStatus by remember {
        mutableStateOf("Checking server...")
    }

    val savedNumbers = remember {
        mutableStateListOf<String>()
    }

    val selectedNumbers = remember {
        mutableStateListOf<String>()
    }

    suspend fun updateServerStatus() {
        serverStatus = checkServer()
    }

    LaunchedEffect(Unit) {
        updateServerStatus()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {

        Text(
            text = "SMS Gateway"
        )

        Text(
            text = "Send SMS using this phone's SIM"
        )

        Text(
            text = "Server: $serverStatus"
        )

        Text(
            text = "Server Address: 10.147.4.98:8080"
        )

        Button(
            onClick = {
                serverStatus = "Checking server..."
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Check Server")
        }

        OutlinedTextField(
            value = phoneNumber,
            onValueChange = {
                phoneNumber = it
            },
            label = {
                Text("Phone Number")
            },
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = {
                val number = phoneNumber.trim()

                if (
                    number.isNotBlank() &&
                    !savedNumbers.contains(number)
                ) {
                    savedNumbers.add(number)
                    phoneNumber = ""
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Save Number")
        }

        Text(
            text = "Saved Numbers"
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {

            items(savedNumbers) { number ->

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {

                    Checkbox(
                        checked = selectedNumbers.contains(number),
                        onCheckedChange = { checked ->

                            if (checked) {
                                if (!selectedNumbers.contains(number)) {
                                    selectedNumbers.add(number)
                                }
                            } else {
                                selectedNumbers.remove(number)
                            }
                        }
                    )

                    Text(text = number)
                }
            }
        }

        OutlinedTextField(
            value = message,
            onValueChange = {
                message = it
            },
            label = {
                Text("Message")
            },
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = {
                if (
                    selectedNumbers.isNotEmpty() &&
                    message.isNotBlank()
                ) {
                    onSendSMS(
                        selectedNumbers.toList(),
                        message
                    )
                } else {
                    // No action if number/message is missing
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Send SMS")
        }
    }
}

suspend fun checkServer(): String {

    return withContext(Dispatchers.IO) {

        try {
            val url = URL(
                "http://10.147.4.98:8080"
            )

            val connection =
                url.openConnection() as HttpURLConnection

            connection.requestMethod = "GET"
            connection.connectTimeout = 3000
            connection.readTimeout = 3000

            connection.connect()

            val responseCode =
                connection.responseCode

            connection.disconnect()

            if (responseCode in 200..499) {
                "RUNNING"
            } else {
                "NOT RUNNING"
            }

        } catch (e: Exception) {
            "NOT RUNNING"
        }
    }
}