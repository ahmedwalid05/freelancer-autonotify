# Freelancer.com auto notifier

Serves as a utility function to get a notification from freelancer.com on your phone for new projects that interest you.

Works by calling an IFFT webhook. You can learn about how to create an IFFT webhook that sends a notification to your phone [here](https://betterprogramming.pub/how-to-send-push-notifications-to-your-phone-from-any-script-6b70e34748f6)

## Installation

1. Clone the repo

```bash
git clone https://github.com/ahmedwalid/freelancer-autonotify.git
```

2. Install NPM packages

```bash
npm install
```

3. Rename the `.env.example` file to `.env` and fill out **all** the fields.

```env
email=test@email.com #Your freelancer.com email
password=1234567 #Your freelancer.com password

keywords=discord,github #Only send notifications for jobs that contain the following keywords ( Leave empty for all jobs)

IFFT_KEY=SOME_RANDOM_KEY #Your IFFT key
IFFT_EVENT_NAME=notify_me #Your IFFT event name
```

## Usage

```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/ahmedwalid05/freelancer-autonotify/blob/master/LICENSE)
