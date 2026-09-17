import { useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import { useLanguage } from "../context/LanguageContext";
import { getProductById, updateProduct } from "../data/products";

const CATEGORIES = ["landscape", "abstract", "botanical", "portrait"];

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lang, t } = useLanguage();
    const product = getProductById(id);
    const imageInputRef = useRef(null);

    const [saved, setSaved] = useState(false);
    const [values, setValues] = useState(() => {
        if (!product) return null;

        return {
            ...product,
            price: String(product.price),
            paletteText: product.palette.join(", "),
        };
    });

    if (!product || !values) return <Navigate to="/admin/products" replace />;

    function updateField(field, value) {
        setSaved(false);
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function updateLocalizedField(field, language, value) {
        setSaved(false);
        setValues((current) => ({
            ...current,
            [field]: {
                ...current[field],
                [language]: value,
            },
        }));
    }

    function handleImageChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            updateField("image", reader.result);
        };

        reader.readAsDataURL(file);
    }

    function handleRemoveImage() {
        updateField("image", "");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        updateProduct({
            ...values,
            price: Number(values.price),
            palette: values.paletteText
                .split(",")
                .map((color) => color.trim())
                .filter(Boolean),
        });

        setSaved(true);
    }

    return (
        <section className="profile-page">
            <div className="profile-page__head">
                <div>
                    <h1>{t("admin.editProductTitle")}</h1>
                    <p className="profile-page__note">{t("admin.editProductNote")}</p>
                </div>

                <Link to="/admin/products" className="btn btn--ghost">
                    {t("admin.backToProducts")}
                </Link>
            </div>

            {saved && (
                <p className="form-success" role="status">
                    {t("admin.productSaved")}
                </p>
            )}

            <div className="piece">
                <div className="piece__art">
                    <CanvasArt
                        palette={values.paletteText.split(",").map((color) => color.trim()).filter(Boolean)}
                        image={values.image}
                        title={values.title[lang]}
                        large
                    />
                </div>

                <form className="order-form profile-form piece__info" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="image">{t("admin.productImage")}</label>
                        <input
                            id="image"
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <p className="field__hint">{t("admin.productImageHint")}</p>
                    </div>

                    <div className="field">
                        <label htmlFor="imageUrl">{t("admin.productImageUrl")}</label>
                        <input
                            id="imageUrl"
                            type="url"
                            value={values.image || ""}
                            onChange={(event) => updateField("image", event.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {values.image && (
                        <button type="button" className="btn btn--ghost btn--small" onClick={handleRemoveImage}>
                            {t("admin.removeProductImage")}
                        </button>
                    )}

                    <div className="field">
                        <label htmlFor="category">{t("admin.productCategory")}</label>
                        <select
                            id="category"
                            value={values.category}
                            onChange={(event) => updateField("category", event.target.value)}
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {t(`categories.${category}`)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="price">{t("admin.productPrice")}</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={values.price}
                            onChange={(event) => updateField("price", event.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="palette">{t("admin.productPalette")}</label>
                        <input
                            id="palette"
                            value={values.paletteText}
                            onChange={(event) => updateField("paletteText", event.target.value)}
                            placeholder="#E8A33D, #7B4B2A"
                            required
                        />
                    </div>

                    <div className="order-form__row">
                        <div className="field">
                            <label htmlFor="titleEn">{t("admin.productTitleEn")}</label>
                            <input
                                id="titleEn"
                                value={values.title.en}
                                onChange={(event) => updateLocalizedField("title", "en", event.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="titleBg">{t("admin.productTitleBg")}</label>
                            <input
                                id="titleBg"
                                value={values.title.bg}
                                onChange={(event) => updateLocalizedField("title", "bg", event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="order-form__row">
                        <div className="field">
                            <label htmlFor="mediumEn">{t("admin.productMediumEn")}</label>
                            <input
                                id="mediumEn"
                                value={values.medium.en}
                                onChange={(event) => updateLocalizedField("medium", "en", event.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="mediumBg">{t("admin.productMediumBg")}</label>
                            <input
                                id="mediumBg"
                                value={values.medium.bg}
                                onChange={(event) => updateLocalizedField("medium", "bg", event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="order-form__row">
                        <div className="field">
                            <label htmlFor="sizeEn">{t("admin.productSizeEn")}</label>
                            <input
                                id="sizeEn"
                                value={values.size.en}
                                onChange={(event) => updateLocalizedField("size", "en", event.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="sizeBg">{t("admin.productSizeBg")}</label>
                            <input
                                id="sizeBg"
                                value={values.size.bg}
                                onChange={(event) => updateLocalizedField("size", "bg", event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="descriptionEn">{t("admin.productDescriptionEn")}</label>
                        <textarea
                            id="descriptionEn"
                            value={values.description.en}
                            onChange={(event) => updateLocalizedField("description", "en", event.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="descriptionBg">{t("admin.productDescriptionBg")}</label>
                        <textarea
                            id="descriptionBg"
                            value={values.description.bg}
                            onChange={(event) => updateLocalizedField("description", "bg", event.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="profile-form__actions">
                        <button type="submit" className="btn btn--gold">
                            {t("admin.saveProduct")}
                        </button>
                        <button type="button" className="btn btn--ghost" onClick={() => navigate(`/piece/${product.id}`)}>
                            {t("profile.cancel")}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}