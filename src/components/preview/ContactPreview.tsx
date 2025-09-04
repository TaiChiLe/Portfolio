import React from "react";

interface ContactMethod {
  type: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  isPlaceholder?: boolean;
}

interface ContactPreviewProps {
  isDarkMode: boolean;
  showLabels?: boolean;
  layout?: "horizontal" | "vertical";
}

const ContactPreview: React.FC<ContactPreviewProps> = ({
  isDarkMode,
  showLabels = true,
  layout = "vertical",
}) => {
  const contactMethods: ContactMethod[] = [
    {
      type: "Email",
      value: "Taichi.le3@gmail.com",
      href: "mailto:Taichi.le3@gmail.com",
      color: "red",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      type: "LinkedIn",
      value: "https://au.linkedin.com/in/tysonle",
      href: "https://au.linkedin.com/in/tysonle",
      color: "blue",
      isPlaceholder: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      type: "GitHub",
      value: "https://github.com/TaiChiLe",
      href: "https://github.com/TaiChiLe",
      color: "gray",
      isPlaceholder: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
  ];

  const getColorClasses = (
    color: string,
    isDarkMode: boolean,
    isPlaceholder = false
  ) => {
    const baseColors = {
      red: {
        bg: isDarkMode ? "bg-red-900" : "bg-red-100",
        text: isDarkMode ? "text-red-400" : "text-red-600",
        hover: isDarkMode ? "hover:bg-red-800" : "hover:bg-red-200",
      },
      blue: {
        bg: isDarkMode ? "bg-blue-900" : "bg-blue-100",
        text: isDarkMode ? "text-blue-400" : "text-blue-600",
        hover: isDarkMode ? "hover:bg-blue-800" : "hover:bg-blue-200",
      },
      gray: {
        bg: isDarkMode ? "bg-gray-700" : "bg-gray-200",
        text: isDarkMode ? "text-gray-400" : "text-gray-600",
        hover: isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300",
      },
    };

    if (isPlaceholder) {
      return {
        bg: isDarkMode ? "bg-gray-800" : "bg-gray-100",
        text: isDarkMode ? "text-gray-500" : "text-gray-400",
        hover: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
      };
    }

    return baseColors[color as keyof typeof baseColors] || baseColors.gray;
  };

  if (layout === "horizontal") {
    return (
      <div>
        <div
          className={`p-4 rounded ${
            isDarkMode
              ? "bg-gray-900 border-gray-600"
              : "bg-gray-50 border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Contact Icon */}
            <div
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-green-900" : "bg-green-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-6 h-6 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>

            <div className="flex-1">
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Get In Touch
              </h2>
              <div className="flex flex-wrap gap-3 mt-2">
                {contactMethods.map((contact, index) => {
                  const colors = getColorClasses(
                    contact.color,
                    isDarkMode,
                    contact.isPlaceholder
                  );
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        colors.bg
                      } ${colors.hover} ${
                        contact.isPlaceholder
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      onClick={
                        contact.isPlaceholder
                          ? (e) => e.preventDefault()
                          : undefined
                      }
                    >
                      <div className={colors.text}>{contact.icon}</div>
                      {showLabels && (
                        <span
                          className={`text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          } ${contact.isPlaceholder ? "italic" : ""}`}
                        >
                          {contact.type}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode
                  ? "bg-green-900 text-green-300"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        className={`p-4 rounded-t ${
          isDarkMode
            ? "bg-gray-900 border-gray-600"
            : "bg-gray-50 border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${
              isDarkMode ? "bg-green-900" : "bg-green-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Information
            </h2>
            <p
              className={`text-sm mt-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Let's connect and collaborate
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? "bg-green-900 text-green-300"
                : "bg-green-100 text-green-800"
            }`}
          >
            Available
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div
        className={`p-4 rounded-b space-y-3 ${
          isDarkMode
            ? "bg-gray-800 border-gray-600"
            : "bg-white border-gray-300"
        }`}
      >
        {contactMethods.map((contact, index) => {
          const colors = getColorClasses(
            contact.color,
            isDarkMode,
            contact.isPlaceholder
          );
          return (
            <a
              key={index}
              href={contact.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              } ${
                contact.isPlaceholder
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
              onClick={
                contact.isPlaceholder ? (e) => e.preventDefault() : undefined
              }
            >
              <div className={`p-2 rounded ${colors.bg}`}>
                <div className={colors.text}>{contact.icon}</div>
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } ${contact.isPlaceholder ? "opacity-70" : ""}`}
                >
                  {contact.type}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } ${contact.isPlaceholder ? "italic opacity-70" : ""}`}
                >
                  {contact.value}
                </p>
              </div>
              {contact.isPlaceholder && (
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    isDarkMode
                      ? "bg-gray-600 text-gray-400"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  Coming Soon
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactPreview;
