// Generated by CoffeeScript 1.9.3
(function() {
  var $G, E, G, fb_project, fb_root, hash;

  $G = $(G = window);

  E = function(tagname) {
    return document.createElement(tagname);
  };

  this.Project = (function() {
    function Project(fb) {
      var $body, bottom_pane, ref, setTheme, themes, themesByName, top_pane;
      this.fb = fb;
      this.languages = ["coffee", "css", "html"];
      this.$codes = $(this.codes = {});
      $body = $(document.body);
      this.main_pane = new PanesPane({
        orientation: "y"
      });
      this.main_pane.add(top_pane = new PanesPane({
        orientation: "x"
      }));
      this.main_pane.add(bottom_pane = new PanesPane({
        orientation: "x"
      }));
      top_pane.add(new EditorPane({
        project: this,
        lang: this.languages[0]
      }));
      top_pane.add(new EditorPane({
        project: this,
        lang: this.languages[1]
      }));
      bottom_pane.add(new EditorPane({
        project: this,
        lang: this.languages[2]
      }));
      bottom_pane.add(new PreviewPane({
        project: this
      }));
      $body.append(this.main_pane.$);
      $G.on("resize", (function(_this) {
        return function() {
          return _this.main_pane.layout();
        };
      })(this));
      this.main_pane.layout();
      ref = ace.require("ace/ext/themelist"), themes = ref.themes, themesByName = ref.themesByName;
      setTheme = function(theme_name) {
        var edpane, i, len, ref1, results, theme;
        theme = themesByName[theme_name];
        if (theme.isDark) {
          $body.addClass("dark");
        } else {
          $body.removeClass("dark");
        }
        ref1 = EditorPane.instances;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          edpane = ref1[i];
          results.push(edpane.editor.setTheme(theme.theme));
        }
        return results;
      };
      setTheme("tomorrow_night_bright");
    }

    Project.prototype.exit = function() {
      $G.off();
      this.main_pane.destroy();
      return this.main_pane.$.remove();
    };

    return Project;

  })();

  fb_root = new Firebase("https://multifiddle.firebaseio.com/");

  hash = G.location.hash.replace('#', '');

  if (hash) {
    fb_project = fb_root.child(hash);
  } else {
    fb_project = fb_root.push();
    G.location = G.location + '#' + fb_project.name();
  }

  $(function() {
    var project;
    project = new Project(fb_project);
    return $G.on("hashchange", function() {
      var new_hash;
      new_hash = G.location.hash.replace('#', '');
      console.debug("from", hash, "to", new_hash);
      if (new_hash !== hash) {
        hash = new_hash;
        project.exit();
        fb_project = fb_root.child(hash);
        return project = new Project(fb_project);
      }
    });
  });

}).call(this);
