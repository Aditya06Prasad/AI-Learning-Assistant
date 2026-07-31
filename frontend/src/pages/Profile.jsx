import Card from "../components/Card";
import Button from "../components/Button";

const Profile = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Profile
      </h1>

      <Card>

        <div className="flex flex-col items-center">

          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="rounded-full w-28 h-28"
          />

          <h2 className="mt-4 text-2xl font-bold">
            Aditya Prasad
          </h2>

          <p className="text-gray-500">
            aditya@gmail.com
          </p>

          <Button className="mt-6">
            Edit Profile
          </Button>

        </div>

      </Card>

    </div>
  );
};

export default Profile;