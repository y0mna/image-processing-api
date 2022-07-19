Hello Hello

Please follow the steps below to run the project. 

1-Install node_modules : npm install
2-Build the project    : npm run build
3-Start the project    : npm run start
4-Run tests            : npm run test
5-Run prettier         : npm run prettier
6-Run eslint           : npm run lint

7-Type the following urls in the browser
http://localhost:3000/api/v1/images?name=encenadaport
http://localhost:3000/api/v1/images?name=encenadaport&width=200&height=562

Query param validations:
-name   : mandatory, string
-width  : optional, integer 
-height : optional, integer

Available images names:
encenadaport.jpg
fjord.jpg
icelandwaterfall.jpg
palmtunnel.jpg
santamonica.jpg