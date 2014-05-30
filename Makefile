make:
	node app.js

clean: 
	rm *~
	rm *#

ssh_marisa:
	ssh -i ~/Dropbox/keypairs/uamod.pem ubuntu@ec2-54-187-73-87.us-west-2.compute.amazonaws.com 