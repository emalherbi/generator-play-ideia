const Generator = require("yeoman-generator");
// var Install = require("yeoman-generator/lib/actions/install");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async askFor() {
    var prompts = [
      {
        name: "appName",
        message: "What is your app's name ?",
        default: "play-ideia",
      },
      {
        name: "appVersion",
        message: "version ?",
        default: "1.0.0",
      },
      {
        type: "confirm",
        name: "includeNormalize",
        message: "Would you like to include normalize.css?",
        default: true,
      },
      {
        type: "confirm",
        name: "includeJQuery",
        message: "Would you like to include jQuery?",
        default: true,
      },
      {
        type: "confirm",
        name: "includeBootstrap",
        message: "Would you like to include Bootstrap?",
        default: true,
      },
    ];

    const answers = await this.prompt(prompts);
    this.appName = answers.appName;
    this.appVersion = answers.appVersion;
    this.includeNormalize = answers.includeNormalize;
    this.includeJQuery = answers.includeJQuery;
    this.includeBootstrap = answers.includeBootstrap;
    if (this.includeBootstrap) this.includeJQuery = true;
  }

  addFiles() {
    this.fs.copyTpl(
      this.templatePath("_index.html"),
      this.destinationPath("app/index.html"),
      {
        appName: this.appName,
        includeNormalize: this.includeNormalize,
        includeJQuery: this.includeJQuery,
        includeBootstrap: this.includeBootstrap,
      }
    );
    this.fs.copy(
      this.templatePath("_yeoman-logo.png"),
      this.destinationPath("app/img/yeoman-logo.png")
    );
    this.fs.copy(
      this.templatePath("_app.css"),
      this.destinationPath("app/css/app.css")
    );
    this.fs.copyTpl(
      this.templatePath("_app.js"),
      this.destinationPath("app/js/app.js"),
      { includeJQuery: this.includeJQuery }
    );
    this.fs.copyTpl(
      this.templatePath("_README.md"),
      this.destinationPath("README.md"),
      { appName: this.appName }
    );
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("_bower.json"),
      this.destinationPath("bower.json"),
      {
        appName: this.appName,
        appVersion: this.appVersion,
        includeNormalize: this.includeNormalize,
        includeJQuery: this.includeJQuery,
        includeBootstrap: this.includeBootstrap,
      }
    );
    this.fs.copy(
      this.templatePath("bowerrc"),
      this.destinationPath(".bowerrc")
    );
    this.fs.copy(
      this.templatePath("_gruntfile.js"),
      this.destinationPath("Gruntfile.js")
    );
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        appName: this.appName,
        appVersion: this.appVersion,
      }
    );
    this.fs.copy(
      this.templatePath("_properties.json"),
      this.destinationPath("properties.json")
    );
  }

  // this.on("end", function () {
  //   this.installDependencies({ skipInstall: options["skip-install"] });
  // });

  // install() {
  //   this.installDependencies({ skipInstall: options["skip-install"] });
  // }

  // install() {
  // Install.installDependencies({
  //   npm: false,
  //   bower: true,
  //   yarn: true,
  // });
  // Install.bowerInstall(this.destinationPath(), {
  //   skipInstall: true,
  // });
  // Install.installDependencies({ skipInstall: options["skip-install"] });
  // }

  install() {
    // this.log.info("Installing yarn packages");
    // await execFile(`"yarn" install`);

    this.spawnCommandSync("bower", ["install"]);
    this.spawnCommandSync("yarn", ["install"]);
  }
};
