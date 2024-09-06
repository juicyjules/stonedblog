{
  description = "Just a small and cute  Next.js blog as done in the tutorial ;)";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, gitignore, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs-18_x;

        node2nixOutput = import ./nix { inherit pkgs nodejs system; };
        # NOTE: may want to try https://github.com/svanderburg/node2nix/issues/301 to limit rebuilds
        nodeDeps = node2nixOutput.nodeDependencies;
        app = pkgs.stdenv.mkDerivation {
          name = "stonedblog";
          version = "1.0.0";
          src = gitignore.lib.gitignoreSource ./.;
          buildInputs = [ nodejs ];

            buildPhase = ''
            runHook preBuild

            # symlink the generated node deps to the current directory for building
            ln -sf ${nodeDeps}/lib/node_modules ./node_modules
            export PATH="${nodeDeps}/bin:$PATH"

            next build
            next export
            runHook postBuild
            '';

            installPhase = ''
            runHook preInstall
            mkdir -p $out
            # cp -r .next $out/.next
            # cp -r public $out/public
            # cp package.json $out/package.json
            cp -r 'out/*' $out/
            runHook postInstall
            '';
        };
      in with pkgs; {
        defaultPackage = app;
        devShell = mkShell { buildInputs = [ nodejs node2nix nodeDeps ]; };
      });
}

