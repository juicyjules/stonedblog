{
  description = "Just a small and cute Next.js blog as done in the tutorial ;)";

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
        nodejs = pkgs.nodejs;

        app = pkgs.buildNpmPackage {
          pname = "stonedblog";
          version = "1.0.0";
          
          src = gitignore.lib.gitignoreSource ./.;
          
          # IMPORTANT: We start with a fake hash. Nix will complain on the first
          # build and give you the real hash to paste in here.
          npmDepsHash = "sha256-qHlJfpVA7fduloCJH6NzIB5PjyytDVk1BcNMn3UVdIo="; 

          # Disable Next.js telemetry during the build
          NEXT_TELEMETRY_DISABLED = 1;

          # buildNpmPackage usually runs `npm run build` by default.
          # If your package.json has a build script, that works perfectly!
          # Otherwise, we can manually run the Next.js commands here:
          buildPhase = ''
            runHook preBuild
            
            # Use npx to run the locally installed next binaries
            npx next build
            npx next export
            
            runHook postBuild
          '';

          installPhase = ''
            runHook preInstall
            
            mkdir -p $out
            # Next.js static exports default to the 'out' directory
            cp -r out/* $out/
            
            runHook postInstall
          '';
        };
      in {
        packages.default = app;
        defaultPackage = app;
        
        devShells.default = pkgs.mkShell { 
          buildInputs = [ 
            nodejs 
            # Added this helper tool. It's great for fetching the new npmDepsHash 
            # if you ever update your dependencies in the future!
            pkgs.prefetch-npm-deps 
          ]; 
        };
      });
}