make:
	sudo node app.js

clean: 
	rm *~
	rm *#

ssh:
	ssh -i uamod.pem ubuntu@ec2-54-187-73-87.us-west-2.compute.amazonaws.com 