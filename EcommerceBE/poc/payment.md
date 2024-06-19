# Challenges in accepting money 

### Multiple modes of payment 
netbanking -> rtgs, imps 
upi
cc
dc
wallets
crypto
SWIFT

### follow multiple compliances 
    * follow security std 
        * cc payment -> PCI DSS -> payment card inustrty std 
        * international -> swift 

licensesn and regulations
you must have licensse to accept payment 
every country has different regulations 
different countries accept payment in diff modes -> upi and rupay 

fraud detection
prevent any fraud transaction -> 

speacilaized service thay only deals with payment , it is going to take a cut 

process of payment acceptance 
config -> API keys 
            public key 
            private key 
        Webhook secret 
            failure 
            success

verification
webhook -> you need to share a route that your payamnet gateway can access to confirm about your status of payment 
expose our server publically so that PG is able to access the webhook route 



