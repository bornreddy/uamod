make:
	sudo node app.js

clean: 
	rm *~
	rm *#

ssh:
	ssh -i uamod.pem ubuntu@ec2-54-187-150-182.us-west-2.compute.amazonaws.com