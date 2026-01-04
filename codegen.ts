import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://odyssey-lift-off-server.herokuapp.com/",
  documents: ["app/**/*.tsx", "components/**/*.tsx"],
  generates: {
    "./__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
