/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const { defineSecret } = require("firebase-functions/params");
require("dotenv").config();

admin.initializeApp();

exports.setClaimsAndInsertUser = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email;

    const customClaims = {
        "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-user-id": uid
        }
    };

    await admin.auth().setCustomUserClaims(uid, customClaims);

    // Insert into Hasura
    const mutation = {
        query: `
      mutation InsertUser($uid: String!, $email: String!) {
        insert_user(objects: {id: $uid, email: $email}, on_conflict: {
          constraint: user_pkey,
          update_columns: []
        }) {
          affected_rows
        }
      }
    `,
        variables: { uid, email }
    };

    try {
        await axios.post(
            process.env.HASURA_GRAPHQL_ENDPOINT,
            mutation,
            {
                headers: {
                    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (err) {
        console.error("Hasura insertion error:", err.message);
    }
});

