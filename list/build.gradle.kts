plugins{ 
    id("com.google.gms.google-services") version "4.4.2" apply false
    id("com.android.application")
}  

dependencies { 
    implementation(platform("com.google.firebase:firebase-bom:33.1.2"))
}
