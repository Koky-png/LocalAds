import { useContext } from "react";
import { AdContext } from "../Context/Adcontext";
import { UserContext } from "../Context/Usercontext";
import { toast } from "react-toastify";

export default function BrowseAds() {
  const { ads, deleteAd } = useContext(AdContext);
  const { current_user } = useContext(UserContext);

  return (
    <div className="container py-5">
      <h1 className="text-center">Browse Ads</h1>
      <div className="row">
        {ads.length === 0 ? (
          <p className="text-muted text-center">No ads available.</p>
        ) : (
          ads.map((ad) => (
            <div key={ad.id} className="col-md-4 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text">{ad.description}</p>
                  <p className="text-primary fw-bold">${ad.price}</p>
                  {/* Show Delete button only if the current user is the seller */}
                  {current_user && current_user.id === ad.seller_id && (
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => {
                        deleteAd(ad.id);
                        toast.success("Ad deleted successfully!");
                      }}
                    >
                      Delete Ad
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
