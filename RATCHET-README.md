## ratchet build

yarn build
sam build --template ./sam-template.yaml
cd .aws-sam/build/ExpressLambdaFunction/
// MANUAL: move the functions and web-build directories into here
zip -vr www-function.zip \*
// upload
