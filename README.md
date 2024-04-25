# Description
This app is intended to help pharmacies track their available drug stock, giving the abilities to know the location of a specific drug, how many units are left and the due date. It relies on the Spanish medicines database (CIMA), by the official agency AEMPS.

# Installation
```npm install```

# Running the application 
```npm run tail```

```npm run json```

# Inserting CN
The app is connected to the Medicine Online Information Center of AEMPS (CIMA in Spanish). By hitting their public API REST, the name of the drug is returned.
The **Código Nacional** or **CN** field references the unique identifier that AEMPS gives to each specific medicine. This way, by simply entering the CN, all data from the medicine will be returned.
For the app to work, you need to enter a valid CN. You can find the CN of any medicine here: https://cima.aemps.es/cima/publico/home.html
