# PhoneDB

A database for phones.

## Prerequesites

You must have the folllowing packages installed:

- Node (v6+)
- NPM (v5+)
- Python 3
- pip 3
- Google Cloud Platform CLI tools (`gcloud`)

## Local Installation

From the home directory of this repository, run:

```
npm install --only=dev
npm run webpack-dev
sudo pip3 install -r requirements.txt
```

If you happen to have issues running the first
command, you can remove the `--only=dev`.

Run the server with:
```
python3 main.py
```

## Production Deployment

Similarly to the development environment, run
the following command on your local machine
from the home directory of the repository:

```
npm install
npm run webpack-prod
```

Once you have this, deploy to the Google Cloud
Platform by running:

```
gcloud app deploy
```

You will have to configure the `gcloud` command
first to deploy to the appropriate project.
