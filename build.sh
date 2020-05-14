APP_NAME="cc"

rm -rf dist node_modules

npm install --registry=http://cc/npm/

rm -rf dist

npm run build

rm -rf output

mkdir -p output/webroot/static/$APP_NAME

#拷贝代码文件
cp -r dist/*  output/webroot/static/$APP_NAME

cd output

#打包
tar -zcf $APP_NAME.tar.gz  webroot/
rm -rf webroot
