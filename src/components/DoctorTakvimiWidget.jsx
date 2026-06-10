import { useEffect } from "react"
import { CalendarCheck } from "lucide-react"
import "./DoctorTakvimiWidget.css"

const SCRIPT_ID = "zl-widget-s"
const WIDGET_SRC = "https://platform.docplanner.com/js/widget.js"
const LOCAL_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^::1$/,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
]

function isLocalOrPrivateHost(hostname) {
  const normalizedHostname = hostname.replace(/^\[|\]$/g, "")
  return LOCAL_HOST_PATTERNS.some((pattern) => pattern.test(normalizedHostname))
}

export default function DoctorTakvimiWidget() {
  useEffect(() => {
    // DoktorTakvimi rejects localhost/private referers with CloudFront 403.
    if (isLocalOrPrivateHost(window.location.hostname)) {
      document.getElementById(SCRIPT_ID)?.remove()
      return
    }

    document.getElementById(SCRIPT_ID)?.remove()

    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.src = WIDGET_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="doctor-takvimi-widget">
      <a
        id="zl-url"
        className="zl-url doctor-takvimi-link"
        href="https://www.doktortakvimi.com/bulent-sabri-keser/uroloji/sanliurfa"
        rel="nofollow"
        data-zlw-doctor="bulent-sabri-keser"
        data-zlw-type="big_with_calendar"
        data-zlw-opinion="false"
        data-zlw-hide-branding="true"
        data-zlw-saas-only="true"
        data-zlw-a11y-title="Doktor randevu widgeti"
      >
        <CalendarCheck className="doctor-takvimi-icon" size={24} />
        <span>Randevu al</span>
      </a>
    </div>
  )
}
