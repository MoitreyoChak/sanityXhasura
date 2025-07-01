const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();

admin.initializeApp();

exports.setClaimsAndInsertUser = functions.auth.user().onCreate(
    async (user) => {
      const uid = user.uid;
      const email = user.email;
      const name = user.name || "default name";

      const customClaims = {
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": uid,
        },
      };

      await admin.auth().setCustomUserClaims(uid, customClaims);

      // Insert into Hasura
      const mutation = {
        query: `
        mutation InsertUser($object: users_insert_input!) {
          insert_users_one(object: $object) {
            email
            id
            isPremiumMember
            name
          }
        }
      `,
        variables: {
          object: {
            id: uid,
            email,
            name,
            isPremiumMember: false,
          },
        },
      };

      try {
        await axios.post(
            process.env.HASURA_GRAPHQL_ENDPOINT,
            mutation,
            {
              headers: {
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
                "Content-Type": "application/json",
              },
            },
        );
      } catch (err) {
        console.error("Hasura insertion error:", err.message);
      }
    },
);
