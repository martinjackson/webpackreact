const webpack = require("webpack");
const program = require('commander');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

var pjson = require('../package.json');                     // assumes running in the ./lib or ./bin directory

program
  .version(pjson.version)
  .description(pjson.description)
  .option('--dev',  'pack for development [Default]')
  .option('--prod', 'pack for production')
  .option('--entry <name>', 'Entry point in source code', './src/index.js')
  .option('--dest <name>',  'Destination path for webpacked bundle', './server/public/')
  .option('--name <name>',  'Bundle name', 'bundle.js')
  .option('--target <name>',  'Build for node or web', 'web')
  .option('--config',       'generate your own webpack.config.js')
  .parse(process.argv);

/*
console.log(' entry:  %j', program.entry);
console.log(' path:   %j', program.dest);
console.log(' name:   %j', program.name);
console.log(' target: %j', program.target);
*/
console.log(' cwd: %j', process.cwd());

const config = {
    mode: (program.prod) ? 'production' : 'development',
    entry: program.entry,
    target: program.target,
    output: {
          path: 'path.join(process.cwd(), \''+ program.dest+'\')',   // path.join(__dirname, program.dest),
          filename: program.name
      },
    resolve:{
      modules: [
      'src',
      "node_modules" ]
      },
    devtool: 'source-map',   
    stats: 'normal',    // 'minimal',    // 'errors-only',
    devServer: {
  
       // dont include boolean equivalent of these commandline switches, it will not work here
       // these are in the package.json where the following is executed
       //  webpack-dev-server --mode development --devtool eval-source --progress --colors
  
       // CLI only    --colors  --progress
       // Docs lie --hot --inline are CLI Only
  
       // --history-api-fallback
       historyApiFallback: true,
  
       // host: '0.0.0.0',     // allow more than localhost (0.0.0.0 confuses win10)
       port: 8080,
       contentBase: program.dest,
       open: true,
       clientLogLevel: 'none',
       stats: 'errors-only',
  
       // allow NodeJS to run side-by-side with webpack-dev-server
       proxy: {  '/api/*': 'http://localhost:8081/' }   // <- backend
    },
    plugins: [
      new ProgressBarPlugin(),
    ],
    module: {
      rules: [
            {
              test: /^(?!.*\.{test,min}\.js$).*\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                }
              }
            },
  
            {
              test: /\.tsx?$/,
              loader: "awesome-typescript-loader",
            },
            
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
  
            // "file" loader for svg
            {
               test: /\.svg|\.png|\.gif|\.jpg$/,
               loader: 'file-loader',
               query: {
                 name: 'static/media/[name].[hash:8].[ext]'
               }
            },
  
            {
              test: /\.html$/,
              loader: 'raw-loader'
            }
      ]
    }
  }
  
if (program.config) {
  let text = JSON.stringify(config, null, 2)
  const cfg = text.replace(/"path": "(.*)",/, 
            function(match,$1){
              return '"path": '+$1;
            });
  console.log(cfg);
  process.exit(0);
}

config.output.path = eval(config.output.path)

const compiler = webpack(config);

const toSkip = (line) => {
  return  line.includes('[built]') || line.includes('Hash:') || line.includes('Version:') || line.includes('Time:') 
}

const minimal = (summary) => {
  const report = summary.split('\n').filter(line => !toSkip(line)).join('\n') + '\n';
  return(report);
}

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    process.exit(1);
  }

  const summary = stats.toString({chunks: false, colors: true});
  process.stdout.write(minimal(summary));

  if (stats.hasErrors()) {
    process.exit(2);
  }
});
