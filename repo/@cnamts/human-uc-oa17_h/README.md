# Offre HUMAN - dependance typescript-axios pur pour la generation openapi


## Documentation

Le but de ce starterkit est d'offrir le socle necessaire et suffisant pour permettre de developper un client typescript-axios basé sur openapi.


## Configuration

Ce starterkit doit etre utilisé avec yarn 1.22.19 et node v14.18.3 minimum pour garantir sa compatibilité avec la PIC.  


# Install dependencies (without update dependencies)
$ yarn install --frozen-lockfile

# Create your own yml openapi contract in place of the existing one (openapi\openapi-beneficiaires-1.0.0.yml)
...

# Launch openapi generation from yml
$ npx @openapitools/openapi-generator-cli generate -v -i openapi\openapi-beneficiaires-1.0.0.yml -g typescript-axios -o ./src/

# Build for production
$ yarn run build

