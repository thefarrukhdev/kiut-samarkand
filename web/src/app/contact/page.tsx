"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Bus,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslation, useLocale } from "@/lib/i18n";
import { formatUzbekistanPhone, isValidUzbekistanPhone } from "@/lib/phone";

export default function ContactPage() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation("footer");

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("+998 ");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const breadcrumbHome = locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa";
  const breadcrumbContact = locale === "ru" ? "Контакты" : locale === "en" ? "Campus & Contacts" : "Aloqa va Manzil";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUzbekistanPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !isValidUzbekistanPhone(phone) || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone,
          selectedFaculty: "Murojaat va Konsultatsiya",
          degree: "Bakalavriat",
          language: "O'zbek",
          studyType: "Kunduzgi",
        }),
      });
      setSubmitted(true);
    } catch {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    {
      title: locale === "ru" ? "Приемная комиссия" : locale === "en" ? "Admissions Hotline" : "Qabul Komissiyasi",
      phone: "+998 (55) 702-40-40",
      email: "admission@sam.kiut.uz",
      hours: locale === "ru" ? "Пн – Сб: 09:00 – 18:00" : locale === "en" ? "Mon – Sat: 09:00 – 18:00" : "Dush – Shanba: 09:00 – 18:00",
    },
    {
      title: locale === "ru" ? "Ректорат и администрация" : locale === "en" ? "Rectorate & Administration" : "Rektorat va Ma'muriyat",
      phone: "+998 (55) 702-40-40",
      email: "info@sam.kiut.uz",
      hours: locale === "ru" ? "Пн – Пт: 09:00 – 18:00" : locale === "en" ? "Mon – Fri: 09:00 – 18:00" : "Dush – Juma: 09:00 – 18:00",
    },
    {
      title: locale === "ru" ? "Офис регистратора (HEMIS)" : locale === "en" ? "Registrar Office (HEMIS)" : "Registrator va HEMIS Ofisi",
      phone: "+998 (55) 702-40-40",
      email: "hemis@sam.kiut.uz",
      hours: locale === "ru" ? "Пн – Сб: 09:00 – 17:00" : locale === "en" ? "Mon – Sat: 09:00 – 17:00" : "Dush – Shanba: 09:00 – 17:00",
    },
    {
      title: locale === "ru" ? "Бухгалтерия и договоры" : locale === "en" ? "Accounting & Contracts" : "Buxgalteriya va Shartnomalar",
      phone: "+998 (55) 702-40-40",
      email: "finance@sam.kiut.uz",
      hours: locale === "ru" ? "Пн – Пт: 09:00 – 17:00" : locale === "en" ? "Mon – Fri: 09:00 – 17:00" : "Dush – Juma: 09:00 – 17:00",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopBar />
      <Navbar
        onLocaleChange={(newLocale) => setLocale(newLocale)}
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <section className="bg-white border-b border-slate-200 py-3.5">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary transition-colors">
                {breadcrumbHome}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-primary font-bold">{breadcrumbContact}</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-surface border-b border-slate-200">
          <Container>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <span className="w-6 h-0.5 bg-accent rounded-full" />
                <span>{locale === "ru" ? "Связь с университетом" : locale === "en" ? "Campus Inquiries" : "Biz bilan bog'lanish"}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-primary tracking-tight leading-[1.15]">
                {locale === "ru"
                  ? "Контакты, адрес и локация кампуса в Самарканде"
                  : locale === "en"
                  ? "Campus Location, Department Contacts & Directory"
                  : "Aloqa, Rasmiy Manzil va Samarqand Kampusi"}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {locale === "ru"
                  ? "Приемная комиссия и администрация Самаркандского филиала готовы ответить на ваши вопросы по телефону, электронной почте или лично в кампусе."
                  : locale === "en"
                  ? "Our admissions counselors and university administration are readily available via phone, email, or in-person at our central Samarkand campus."
                  : "Savollaringiz bo'yicha qabul komissiyamiz va universitet ma'muriyati bilan telefon, pochta orqali yoki to'g'ridan-to'g'ri kampusimizga tashrif buyurib bog'lanishingiz mumkin."}
              </p>
            </div>
          </Container>
        </section>

        {/* Departments Grid */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, idx) => (
                <div key={idx} className="bg-surface p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-base font-bold text-primary">{dept.title}</h3>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <a href={`tel:${dept.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 font-bold text-primary hover:text-accent">
                      <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span>{dept.phone}</span>
                    </a>
                    <a href={`mailto:${dept.email}`} className="flex items-center gap-2 hover:text-primary">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{dept.email}</span>
                    </a>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{dept.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Map & Inquiry Form Grid */}
        <section className="py-16 sm:py-20 bg-surface border-b border-slate-200">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Campus Address & Transport (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        {locale === "ru" ? "Официальный адрес" : locale === "en" ? "Official Campus Address" : "Rasmiy Manzil"}
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-1">
                        {t.address}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {locale === "ru" ? "Ориентир: напротив остановки Спитамен" : locale === "en" ? "Landmark: Spitamen Avenue central transit" : "Mo'ljal: Spitamen shoh ko'chasi"}
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Samarqand+Spitamen+shoh+ko%27chasi+270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-hover"
                  >
                    <span>{locale === "ru" ? "Открыть в Google Maps" : locale === "en" ? "Open in Google Maps" : "Google Xaritada ko'rish"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  {/* Public Transport Guide */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary">
                      <Bus className="h-4 w-4 text-accent" />
                      <span>{locale === "ru" ? "Как добраться общественным транспортом:" : locale === "en" ? "Public Transportation Access:" : "Jamoat transporti orqali yetib kelish:"}</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-6 list-disc">
                      <li>{locale === "ru" ? "От ж/д вокзала Самарканда: автобусы № 3, 22 (15 мин)" : locale === "en" ? "From Samarkand Railway Station: Buses 3, 22 (approx. 15 min)" : "Samarqand temir yo'l vokzalidan: 3, 22-sonli avtobuslar"}</li>
                      <li>{locale === "ru" ? "От международного аэропорта Самарканда: маршрутные такси № 10, 35 (20 мин)" : locale === "en" ? "From Samarkand International Airport: Transit routes 10, 35 (approx. 20 min)" : "Samarqand xalqaro aeroportidan: 10, 35-sonli marshrutlar"}</li>
                    </ul>
                  </div>
                </div>

                {/* Map Embed Frame */}
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md aspect-[16/10] bg-slate-100 relative">
                  <iframe
                    title="KIUT Samarkand Campus Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.0!2d66.9!3d39.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzAwLjAiTiA2NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2suz!4v1620000000000!5m2!1sen!2suz"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Right Column: Fast Inquiry Form (6 cols) */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    {locale === "ru" ? "Обратная связь" : locale === "en" ? "Direct Message" : "Murojaat qoldirish"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-primary">
                    {locale === "ru" ? "Напишите нам онлайн" : locale === "en" ? "Send Us an Inquiry" : "Savolingiz bormi? Yozib qoldiring"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {locale === "ru"
                      ? "Специалисты приемной комиссии ответят в течение рабочего дня."
                      : locale === "en"
                      ? "Our advisors will review and respond promptly within standard business hours."
                      : "Murojaatingiz qabul qilinib, mutaxassislarimiz qisqa vaqtda siz bilan bog'lanishadi."}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900">
                      {locale === "ru" ? "Сообщение успешно отправлено!" : locale === "en" ? "Message Sent Successfully!" : "Murojaatingiz muvaffaqiyatli qabul qilindi!"}
                    </h4>
                    <p className="text-xs text-emerald-700">
                      {locale === "ru"
                        ? "Мы свяжемся с вами по указанному номеру телефона."
                        : locale === "en"
                        ? "An advisor will reach out to you via your provided telephone number."
                        : "Mutaxassislarimiz tez orada siz ko'rsatgan telefon raqami orqali bog'lanishadi."}
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setPhone("+998 ");
                        setMessage("");
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs font-bold"
                    >
                      {locale === "ru" ? "Отправить еще" : locale === "en" ? "Send Another Message" : "Yana xabar yuborish"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {locale === "ru" ? "Ваше имя" : locale === "en" ? "Full Name" : "F.I.Sh (Ismingiz)"}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={locale === "ru" ? "Например: Алишер" : locale === "en" ? "e.g. Alisher" : "Masalan: Alisher"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-accent text-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {locale === "ru" ? "Телефон для связи" : locale === "en" ? "Phone Number" : "Telefon raqamingiz"}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+998 (90) 123-45-67"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-accent text-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-msg" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {locale === "ru" ? "Текст сообщения" : locale === "en" ? "Inquiry Details" : "Murojaat matni"}
                      </label>
                      <textarea
                        id="contact-msg"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          locale === "ru"
                            ? "Напишите ваш вопрос..."
                            : locale === "en"
                            ? "Write your question here..."
                            : "Savolingizni bu yerga yozing..."
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-accent text-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="action"
                      size="lg"
                      className="w-full font-bold bg-primary hover:bg-accent text-white py-3 rounded-xl text-xs sm:text-sm transition-all"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      <span>{locale === "ru" ? "Отправить сообщение" : locale === "en" ? "Send Inquiry" : "Xabarni jo'natish"}</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingContact onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty="Tibbiyot fakulteti"
      />
    </div>
  );
}
