import mongoose from "mongoose";

const atlasDirectHosts = {
  "studyplanner.iybj9hi.mongodb.net": [
    "ac-yc7m8r7-shard-00-00.iybj9hi.mongodb.net:27017",
    "ac-yc7m8r7-shard-00-01.iybj9hi.mongodb.net:27017",
    "ac-yc7m8r7-shard-00-02.iybj9hi.mongodb.net:27017",
  ],
};

const toDirectAtlasUri = (mongoUri) => {
  const uri = new URL(mongoUri);
  const hosts = atlasDirectHosts[uri.hostname];

  if (uri.protocol !== "mongodb+srv:" || !hosts) {
    return null;
  }

  uri.protocol = "mongodb:";
  uri.host = hosts.join(",");
  uri.searchParams.set("authSource", "admin");
  uri.searchParams.set("replicaSet", "atlas-ldsqxg-shard-0");
  uri.searchParams.set("tls", "true");

  return uri.toString();
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    const options = {
      serverSelectionTimeoutMS: 10000,
    };

    try {
      await mongoose.connect(process.env.MONGO_URI, options);
    } catch (error) {
      const directUri = toDirectAtlasUri(process.env.MONGO_URI);

      if (!error.message.includes("querySrv") || !directUri) {
        throw error;
      }

      console.warn(
        "MongoDB SRV DNS lookup failed; retrying with direct Atlas hosts."
      );
      await mongoose.connect(directUri, options);
    }

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (error.message.includes("querySrv")) {
      console.error(
        "Your machine could not resolve MongoDB Atlas DNS SRV records. Check your internet connection, DNS settings, VPN/firewall, and Atlas cluster hostname."
      );
    }

    process.exit(1);
  }
};

export default connectDB;
